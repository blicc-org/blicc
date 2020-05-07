package middleware

import (
	"context"
	"crypto/rsa"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/blicc-org/blicc/delivery/pkg/common/flags"
	"github.com/dgrijalva/jwt-go"
	"github.com/patrickmn/go-cache"
)

type userPermission struct {
	UserId string
	Role   string
}

var certsCache = cache.New(60*time.Minute, 120*time.Minute)

func getCertificate() rsa.PublicKey {
	if key, ok := certsCache.Get("rsa_pub"); ok {
		return key.(rsa.PublicKey)
	} else {
		certsPath := flags.Instance().CertsPath

		keyData, err := ioutil.ReadFile(certsPath + "/rsa_pub.pem")
		if err != nil {
			log.Println(err)
		}

		key, err := jwt.ParseRSAPublicKeyFromPEM(keyData)
		if err != nil {
			log.Println(err)
		}

		certsCache.Set("rsa_pub", *key, cache.DefaultExpiration)
		return *key
	}
}

func validate(key *rsa.PublicKey, tokenString string) (permission userPermission, err error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return key, nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		permission = userPermission{
			UserId: fmt.Sprint(claims["userId"]),
			Role:   fmt.Sprint(claims["role"]),
		}
		return permission, nil
	} else {
		return userPermission{}, errors.New("JWT not valid")
	}
}

func Permission(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("access_token")
		if err != nil {
			fmt.Println(err)
			next.ServeHTTP(w, r)
			return
		}

		key := getCertificate()

		permission, err := validate(&key, cookie.Value)
		if err != nil {
			fmt.Println(err)
			next.ServeHTTP(w, r)
			return
		}

		ctx := context.WithValue(r.Context(), "userId", permission.UserId)
		ctx = context.WithValue(ctx, "role", permission.Role)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

package auth

import (
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/blicc-org/blicc/delivery/pkg/utils/flags"
	"github.com/dgrijalva/jwt-go"
)

func verify(token string) bool {
	var algorithm = "RS256"

	certsPath := flags.Instance().CertsPath

	keyData, _ := ioutil.ReadFile(certsPath + "/rsa_pub.pem")
	key, _ := jwt.ParseRSAPublicKeyFromPEM(keyData)

	parts := strings.Split(token, ".")
	signingString := strings.Join(parts[:2], ".")
	signature := parts[2]

	method := jwt.GetSigningMethod(algorithm)
	err := method.Verify(signingString, signature, key)
	return err == nil
}

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		cookie, err := r.Cookie("access_token")
		if err == nil && verify(cookie.Value) {
			log.Println("Authorization was successful!")
			next.ServeHTTP(w, r)
			return
		}
		log.Println("Invalid access_token")
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Unauthorized"))
	})
}

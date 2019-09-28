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

	keyData, err := ioutil.ReadFile(certsPath + "/rsa_pub.pem")
	if err != nil {
		log.Println(err)
	}

	key, err := jwt.ParseRSAPublicKeyFromPEM(keyData)
	if err != nil {
		log.Println(err)
	}

	parts := strings.Split(token, ".")
	signingString := strings.Join(parts[:2], ".")
	signature := parts[2]

	method := jwt.GetSigningMethod(algorithm)

	return method.Verify(signingString, signature, key) == nil
}

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("sheeesh")
		next.ServeHTTP(w, r)

		// cookie, err := r.Cookie("access_token")
		// if err != nil {
		// 	log.Println(err)
		// } else {
		// 	log.Println(cookie)
		// }

		// if err == nil && verify(cookie.Value) {
		// 	log.Println("Authorization was successful!")
		// 	next.ServeHTTP(w, r)
		// 	return
		// }
		// log.Println("Invalid access_token")
		// w.WriteHeader(http.StatusUnauthorized)
		// w.Write([]byte("Unauthorized"))
	})
}

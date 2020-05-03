package middleware

import (
	"log"
	"net/http"
)

func Logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s: %s \n", r.Method, r.RequestURI)
		next.ServeHTTP(w, r)
	})
}

package logging

import (
	"log"
	"net/http"
)

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s: %s \n", r.Method, r.RequestURI)
		next.ServeHTTP(w, r)
	})
}

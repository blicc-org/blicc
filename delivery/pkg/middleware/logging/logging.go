package logging

import (
	"fmt"
	"net/http"
)

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("%s: %s \n", r.Method, r.RequestURI)
		next.ServeHTTP(w, r)
	})
}

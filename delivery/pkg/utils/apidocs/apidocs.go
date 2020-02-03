package apidocs

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"github.com/gomarkdown/markdown"
)

func Generate() {
	pwd, _ := os.Getwd()

	file, err := os.Open(pwd + "/docs/api-docs.md")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	md, err := ioutil.ReadAll(file)

	body := markdown.ToHTML(md, nil, nil)

	f, err := os.Create(pwd + "/public/index.html")
	if err != nil {
		fmt.Println(err)
		return
	}

	openHTML := []byte("<!DOCTYPE html>\n\n<html>\n\n<head>\n\n<link rel='stylesheet' type='text/css' href='style.css'>\n\n</head>\n\n<body>\n\n")
	closeHTML := []byte("\n\n</body>\n\n</html>")
	html := append(openHTML, body...)
	html = append(html, closeHTML...)
	l, err := f.Write(html)
	if err != nil {
		fmt.Println(err)
		f.Close()
		return
	}
	fmt.Println(l, "bytes written successfully")
	err = f.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
}

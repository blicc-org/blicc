package apidocs

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"

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

	content := markdown.ToHTML(md, nil, nil)

	f, err := os.Create(pwd + "/public/index.html")
	if err != nil {
		fmt.Println(err)
		return
	}

	b, err := ioutil.ReadFile(pwd + "/docs/template.html")
	if err != nil {
		fmt.Print(err)
	}

	str := string(b)
	str = strings.Replace(str, "{{content}}", string(content), 1)

	_, err = f.Write([]byte(str))
	if err != nil {
		fmt.Println(err)
		f.Close()
		return
	}

	err = f.Close()

	if err != nil {
		fmt.Println(err)
		return
	} else {
		fmt.Println("Api docs generated")
	}
}

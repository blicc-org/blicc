package supplier

import (
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func reader(conn *websocket.Conn) {
	for {

		messageType, p, err := conn.ReadMessage()

		if err != nil {
			log.Println(err)
			return
		}

		url := string(p)
		response, err := http.Get(url)

		if err != nil {
			log.Println(err)
		}

		data, _ := ioutil.ReadAll(response.Body)

		if err := conn.WriteMessage(messageType, data); err != nil {
			log.Println(err)
			return
		}
	}
}

func Route(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Connection established...")
	reader(ws)
}

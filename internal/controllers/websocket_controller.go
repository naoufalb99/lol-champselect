package controllers

import (
	"log"
	"encoding/base64"
	"net/http"
	"net/url"
	"../getlcucredentials"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}


func Websocket(response http.ResponseWriter, request *http.Request) {

	upgrader.CheckOrigin = func(_ *http.Request) bool { return true }

	conn, err := upgrader.Upgrade(response, request, nil)

	if err != nil {
		log.Print("upgrade:", err)
		return
	}

	defer conn.Close()

	lcuConn, err := lcuWebsocketConn()
	if err != nil {
		log.Print("lcuWebsocketConn:", err)
		return 
	}
	defer lcuConn.Close()
	
	// subscribe to champ select events
	lcuConn.WriteMessage(websocket.TextMessage, []byte("[5, \"OnJsonApiEvent_lol-champ-select_v1_session\"]"))
	lcuConn.WriteMessage(websocket.TextMessage, []byte("[5, \"OnJsonApiEvent_lol-lobby_v2_lobby\"]"))


	if err != nil {
		log.Println("can't send champ select events subscribtion :", err)
		return
	}


	for {
		mt, message, err := lcuConn.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			return
		}
		if len(message) == 0 { continue }
		err = conn.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}

}

func lcuWebsocketConn() (*websocket.Conn, error) {

	host, password := getlcucredentials.Host()
	header := http.Header{"Authorization": {"Basic " + base64.StdEncoding.EncodeToString([]byte( "riot:" + password))}}
	url := url.URL{Scheme: "wss", Host: host , Path: "/"}

	conn, _, err := websocket.DefaultDialer.Dial(url.String(), header)

	if err != nil {
		return nil, err
	}

	return conn, nil

}
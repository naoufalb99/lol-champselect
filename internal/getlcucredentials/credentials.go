package getlcucredentials

import (
	"regexp"
	"os/exec"
	"log"
	"fmt"
)

func Host() (string, string){
	// TODO: error handling
	out, err := exec.Command("wmic", "PROCESS", "WHERE", "name='LeagueClientUx.exe'", "GET", "commandline").Output()
	if err != nil {
		log.Fatal(err)
		return "", ""
	}
	r, _ := regexp.Compile("--app-port=([0-9]*)")
	port := r.FindStringSubmatch(string(out))[1]
	r, _ = regexp.Compile("--remoting-auth-token=([\\w-_]*)")
	password := r.FindStringSubmatch(string(out))[1]

	log.Printf("https://riot:%s@127.0.0.1:%s", password, port)
	
	return fmt.Sprintf("127.0.0.1:%s",port), password
}
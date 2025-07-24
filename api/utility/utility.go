package utility

import (
	"encoding/json"
	"log"
	"os"
)

func LoadEnv(envName, field string) string {
	raw := os.Getenv(envName)
	if raw == "" {
		log.Fatalf("Env variables not found %s", envName)
	}

	var parsed map[string]string
	err := json.Unmarshal([]byte(raw), &parsed)
	if err == nil {
		val, ok := parsed[field]
		if !ok {
			log.Fatalf("Field %s not found in secret: %s", field, envName)
		}
		return val
	}

	if field != "" {
		log.Fatalf("Secret %s is raw but expected field '%s'", envName, field)
	}
	return raw
}

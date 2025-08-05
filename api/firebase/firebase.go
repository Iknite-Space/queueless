package firebase

import (
	"context"
	"log"
	"os"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

func InitApp() *firebase.App {
	firebaseCredentials := os.Getenv("FIREBASE_CONFIG")
	if firebaseCredentials == "" {
		log.Fatal("FIREBASE_CONFIG environment variable not configured")
	}

	opt := option.WithCredentialsJSON([]byte(firebaseCredentials))
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("Firebase init failed: %v", err)
	}
	return app
}

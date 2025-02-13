package database

import (
    "fmt"
    "log"
    "os"
    "gorm.io/driver/postgres"
    "wordsofnemo/server/internal/models"
    "gorm.io/gorm"
)

func InitDB() *gorm.DB {
    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
        os.Getenv("DB_HOST"),
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"),
        os.Getenv("DB_PORT"),
    )

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    err = db.AutoMigrate(&models.User{})
    if err != nil {
        log.Fatal("Failed to migrate database:", err)
    }

    log.Println("Successfully connected to database")
    return db
}
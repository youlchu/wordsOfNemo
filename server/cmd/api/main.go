// cmd/api/main.go
package main

import (
    "log"
    "os"
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
)

// @title WordsOfNemo API
// @version 1.0
// @description WordsOfNemo API documentation
// @host localhost:3000
// @BasePath /api
func main() {
    if err := godotenv.Load(); err != nil {
        log.Println("Warning: .env file not found")
    }

    r := gin.Default()

    // @Summary Ping endpoint
    // @Description ping pong test endpoint
    // @Accept json
    // @Produce json
    // @Success 200 {object} map[string]string
    // @Router /ping [get]
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })

    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

    port := os.Getenv("PORT")
    if port == "" {
        port = "3000"
    }

    r.Run(":" + port)
}
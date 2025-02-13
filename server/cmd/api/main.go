// cmd/api/main.go
package main

import (
    "log"
    "os"
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
    "wordsofnemo/server/internal/database"
    "wordsofnemo/server/internal/controllers"
    "wordsofnemo/server/internal/services"
    _ "wordsofnemo/docs" 
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

    db := database.InitDB()

    userService := services.NewUserService(db)
    userController := controllers.NewUserController(userService)

    r := gin.Default()
    
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

    // API routes - /api prefix'ini bir kez kullanıyoruz
    users := r.Group("/api/users")
    {
        users.POST("/register", userController.Register)
    }

    port := os.Getenv("PORT")
    if port == "" {
        port = "3000"
    }

    r.Run(":" + port)
}
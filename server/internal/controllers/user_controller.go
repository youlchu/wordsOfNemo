package controllers

import (
    "net/http"
    "wordsofnemo/server/internal/models"
    "wordsofnemo/server/internal/services"
    "github.com/gin-gonic/gin"
)

type UserController struct {
    userService *services.UserService
}

func NewUserController(userService *services.UserService) *UserController {
    return &UserController{userService: userService}
}

// @Summary Register a new user
// @Description Create a new user account
// @Tags users
// @Accept json
// @Produce json
// @Param request body models.RegisterRequest true "User registration details"
// @Success 201 {object} models.RegisterResponse
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /users/register [post]
func (c *UserController) Register(ctx *gin.Context) {
    var req models.RegisterRequest
    if err := ctx.ShouldBindJSON(&req); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    response, err := c.userService.Register(&req)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    ctx.JSON(http.StatusCreated, response)
} 
package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	FirstName string    `json:"first_name" binding:"required"`
	LastName  string    `json:"last_name" binding:"required"`
	Email     string    `json:"email" binding:"required,email" gorm:"unique"`
	Phone     string    `json:"phone" binding:"required,min=10,max=15" gorm:"unique"`
	Password  string    `json:"password" binding:"required,min=6"`
}

type RegisterRequest struct {
    FirstName string `json:"first_name" binding:"required" example:"John"`
    LastName  string `json:"last_name" binding:"required" example:"Doe"`
    Email     string `json:"email" binding:"required,email" example:"john@example.com"`
    Phone     string `json:"phone" binding:"required,min=10,max=15" example:"5551234567"`
    Password  string `json:"password" binding:"required,min=6" example:"123456"`
}

type RegisterResponse struct {
    ID        uint      `json:"id" example:"1"`
    FirstName string    `json:"first_name" example:"John"`
    LastName  string    `json:"last_name" example:"Doe"`
    Email     string    `json:"email" example:"john@example.com"`
    Phone     string    `json:"phone" example:"5551234567"`
    CreatedAt time.Time `json:"created_at"`
}
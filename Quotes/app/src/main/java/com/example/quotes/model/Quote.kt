package com.example.quotes.model

class Quote(val text: String, val author: String) {
    override fun toString(): String {
        return "Quote{" +
                "text='" + text + '\'' +
                ", author='" + author + '\'' +
                '}'
    }
}
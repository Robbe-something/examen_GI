package com.example.quotes.ui

data class QuoteUiState(
    val currentQuoteIndex: Int = 0,
    val currentQuote: String = "",
    val currentAuthor: String = "",
    val progress: Float = 0F
)
package com.example.quotes.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import com.example.quotes.model.QuoteDAO
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class QuoteViewModel(application: Application) : AndroidViewModel(application) {
    private val _uiState = MutableStateFlow(QuoteUiState())
    val uiState: StateFlow<QuoteUiState> = _uiState.asStateFlow()

    private var _dao: QuoteDAO

    init {
        _dao = QuoteDAO(application.applicationContext)

        val quote = _dao.get(_uiState.value.currentQuoteIndex)
        _uiState.value = QuoteUiState(currentQuote = quote.text, currentAuthor = quote.author)
    }

    fun updateQuote() {
        _uiState.update {currentState ->
            currentState.copy(
                currentQuoteIndex = (currentState.currentQuoteIndex + 1) % _dao.size,
                currentQuote = _dao[currentState.currentQuoteIndex].text,
                currentAuthor = _dao[currentState.currentQuoteIndex].author,
                progress = 0F
            )
        }
    }

    fun updateProgress(increment: Float) {
        _uiState.update { currentState ->
            currentState.copy(
                progress = currentState.progress + increment
            )
        }
    }
}
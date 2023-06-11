package com.example.quotes

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.ExperimentalTextApi
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.quotes.model.QuoteDAO
import com.example.quotes.ui.QuoteViewModel
import com.example.quotes.ui.theme.QuotesTheme
import kotlinx.coroutines.delay
import kotlin.time.Duration.Companion.milliseconds

class MainActivity : ComponentActivity() {
    lateinit var dao: QuoteDAO

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            QuotesTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    QuoteScreen()
                }
            }
        }
    }
}

@OptIn(ExperimentalTextApi::class)
@Composable
fun QuoteScreen(
    modifier: Modifier = Modifier,
    quoteViewModel: QuoteViewModel = viewModel()
) {
    val quoteUiState by quoteViewModel.uiState.collectAsState()

    LaunchedEffect(Unit) {
        while (true) {
            delay(10.milliseconds)
            quoteViewModel.updateProgress(0.002F)

            if (quoteUiState.progress >= 1F) {
                quoteViewModel.updateQuote()
            }
        }
    }

    Column(
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = stringResource(id = R.string.quote_left),
            fontSize = 150.sp,
            modifier = modifier
                .padding(start = 4.dp)
                .height(110.dp),
        )
        Text(
            text = quoteUiState.currentQuote,
            fontSize = 32.sp,
            modifier = modifier
                .padding(start = 8.dp, end = 8.dp)
                .fillMaxWidth()
        )
        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = modifier.fillMaxWidth()
        ) {
            Text(
                text = quoteUiState.currentAuthor,
                fontSize = 24.sp,
                modifier = modifier
                    .padding(start = 16.dp)
            )
            Text(
                text = stringResource(id = R.string.quote_right),
                fontSize = 150.sp,
                modifier = modifier
                    .padding(end = 4.dp)
            )
        }
    }
    Column(
        modifier = modifier.fillMaxHeight(),
        verticalArrangement = Arrangement.Bottom
    ) {
        LinearProgressIndicator(
            progress = quoteUiState.progress,
            modifier = modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(20.dp))
                .padding(10.dp)
        )
    }
}
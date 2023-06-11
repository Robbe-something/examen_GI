package com.example.quiz

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.sp
import com.example.quiz.ui.theme.QuizTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            QuizTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    QuizScreen()
                }
            }

        }
    }
}

@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    QuizTheme {
        Greeting("Android")
    }
}

@Composable
fun QuizScreen() {
    Column() {
        QuestionScreen()
        AnswerScreen()
    }
}

@Composable
@Preview(showBackground = true)
fun QuizPreview() {
    QuizScreen()
}

@Composable
fun QuestionScreen() {
    Text(text = "This is a question",
        style = TextStyle(fontSize = 40.sp))
}

@Composable
fun AnswerScreen() {
    Row() {
        TextField(value = "Type answer", onValueChange = {/*TODO*/})
        Button(onClick = { /*TODO*/ }, ) {
            Text(stringResource(R.string.button_text))
        }
    }
}
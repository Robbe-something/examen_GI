package com.example.quiz

import android.os.Bundle
import android.os.PersistableBundle
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.app.ActivityCompat.startActivityForResult
import com.bumptech.glide.integration.compose.ExperimentalGlideComposeApi
import com.bumptech.glide.integration.compose.GlideImage
import com.example.quiz.model.Question
import com.example.quiz.model.QuizMaster
import com.example.quiz.ui.theme.QuizTheme

class MainActivity : ComponentActivity() {
    private companion object {
        val HINT_REQUEST = 1
    }

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
fun QuizScreen(modifier: Modifier = Modifier) {
    var question by remember { mutableStateOf(QuizMaster.currentQuestion.question) }
    var textHint by remember { mutableStateOf("") }
    var imageAlpha by remember { mutableStateOf(0.0F) }
    var textHintStatus by remember { mutableStateOf(false) }
    var imageHintStatus by remember { mutableStateOf(false) }

    Column(modifier = modifier, verticalArrangement = Arrangement.SpaceEvenly) {
        Box {
            QuestionScreen(
                modifier = modifier,
                question = question
            )
            HintScreen(
                modifier = modifier,
                textHint = textHint,
                imageAlpha = imageAlpha
            )
        }
        Spacer(modifier.weight(1.0F))
        AnswerScreen(
            modifier = modifier,
            correctAnswer = QuizMaster.currentQuestion.answer,
            onNextQuestion = {
                QuizMaster.nextQuestion()
                question = QuizMaster.currentQuestion.question
                textHintStatus = false
                imageHintStatus = false
                imageAlpha = 0.0F
                textHint = ""
            }
        )
        HintSwitch(text = "text hint", status = textHintStatus, onStatusChanged = {
            textHintStatus = it
            if(textHintStatus){
                textHint = QuizMaster.currentQuestion.textHint
                imageHintStatus = false;
                imageAlpha = 0.0F
                question = ""
            }
            else{
                if(!imageHintStatus){
                    question = QuizMaster.currentQuestion.question
                }
                textHint = ""
            }
        })
        HintSwitch(text = "image hint", status = imageHintStatus, onStatusChanged = {
            imageHintStatus = it
            if(imageHintStatus){
                imageAlpha = 1.0F
                textHintStatus = false
                textHint = ""
                question = ""
            }
            else{
                if(!textHintStatus){
                    question = QuizMaster.currentQuestion.question
                }
                imageAlpha = 0.0F
            }
        })
    }
}

@Composable
fun QuestionScreen(
    modifier: Modifier = Modifier,
    question: String
) {
    Text(
        question,
        style = TextStyle(fontSize = 60.sp),
        modifier = modifier
            .fillMaxWidth().padding(8.dp)
    )
}

@OptIn(ExperimentalGlideComposeApi::class)
@Composable
fun HintScreen(
    modifier: Modifier = Modifier,
    textHint: String,
    imageAlpha: Float
) {
    Text(
        textHint,
        style = TextStyle(fontSize = 60.sp),
        modifier = modifier.padding(8.dp)
    )
    GlideImage(
        model = QuizMaster.currentQuestion.imageURIHint,
        contentDescription = "",
        alpha = imageAlpha,
        modifier = modifier.size(256.dp)
    )
}

@Composable
fun AnswerScreen(
    modifier: Modifier = Modifier,
    correctAnswer: String,
    onNextQuestion: () -> Unit
) {
    var answer by remember { mutableStateOf("") }
    val context = LocalContext.current
    Row {
        TextField(
            value = answer,
            onValueChange = {
                answer = it
            },
            modifier = modifier
                .padding(horizontal = 4.dp),
            label = { Text(stringResource(R.string.answer)) },
            singleLine = true
        )
        Button(
            onClick = {
                if (answer == correctAnswer) {
                    answer = ""
                    onNextQuestion()
                    Toast.makeText(context, "Correct!", Toast.LENGTH_SHORT).show()
                }
                else{
                    Toast.makeText(context, "Wrong!", Toast.LENGTH_SHORT).show()
                }
            },
            modifier = modifier
                .weight(1.0F)
                .padding(horizontal = 4.dp)
        ) {
            Text(stringResource(R.string.ok_button))
        }
    }
}
@Composable
fun HintSwitchScreen(
    modifier: Modifier = Modifier
){

}
@Composable
fun HintSwitch(
    text: String,
    status: Boolean,
    onStatusChanged: (Boolean) -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Spacer(modifier = modifier.width(12.dp))
        Text(text = text)
        Spacer(modifier = modifier.weight(1.0F))
        Switch(
            modifier = modifier.wrapContentWidth(Alignment.End),
            checked = status,
            onCheckedChange = onStatusChanged,
            colors = SwitchDefaults.colors(
                uncheckedThumbColor = Color.DarkGray
            )
        )
        Spacer(modifier = modifier.width(256.dp))
    }
}

@Preview(showBackground = true)
@Composable
fun QuizPreview() {
    QuizTheme {
        QuizScreen()
    }
}
package com.example.trafficfeed

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.annotation.DrawableRes
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.ExpandLess
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.trafficfeed.data.DataSource
import com.example.trafficfeed.model.TrafficNotification
import com.example.trafficfeed.ui.theme.TrafficFeedTheme
import java.time.format.TextStyle

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val notifications: List<TrafficNotification> =
            DataSource().loadTrafficNotifications(applicationContext)

        setContent {
            TrafficFeedTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    TrafficNotificationList(
                        trafficNotificationList = notifications
                    )
                }
            }
        }
    }
}


@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun TrafficNotificationList(
    trafficNotificationList: List<TrafficNotification>,
    modifier: Modifier = Modifier
) {
    var searchText by remember { mutableStateOf("") }
    var trafficNotifications by remember { mutableStateOf(trafficNotificationList) }

    Scaffold(
        topBar = {
            TopBar(
                modifier = modifier,
                searchText = searchText,
                onTextChange = {
                    searchText = it
                },
                search = {
                    trafficNotifications = trafficNotificationList.filter { trafficNotification ->
                        trafficNotification.name.contains(searchText)
                    }
                },
                onCloseClicked = {
                    searchText = ""
                    trafficNotifications = trafficNotificationList
                }
            )
        }
    )
    {
        LazyColumn {
            items(trafficNotifications) { trafficNotification ->
                TrafficNotificationCard(trafficNotification)
            }
        }
    }
}

@Composable
fun TopBar(
    modifier: Modifier = Modifier,
    searchText: String,
    onTextChange: (String) -> Unit,
    search: () -> Unit,
    onCloseClicked: () -> Unit
) {
    var searchOpened by remember { mutableStateOf(false) }

    if (searchOpened) {
        SearchAppBar(
            text = searchText,
            onTextChange = onTextChange,
            onCloseClicked = {
                searchOpened = false
                onCloseClicked()
            },
            search = search,
            modifier = modifier
        )
    } else {
        DefaultAppBar {
            searchOpened = true;
        }
    }
}

@Composable
fun DefaultAppBar(onSearchClicked: () -> Unit) {
    TopAppBar(
        elevation = 4.dp,
        title = {
            Text(
                text = stringResource(R.string.title),
                style = MaterialTheme.typography.h1
            )
        },
        backgroundColor = MaterialTheme.colors.surface,
        actions = {
            IconButton(
                onClick = { onSearchClicked() }
            ) {
                Icon(
                    imageVector = Icons.Filled.Search,
                    contentDescription = stringResource(R.string.search_icon_description),
                )
            }
        }
    )
}

@Composable
fun SearchAppBar(
    text: String,
    onTextChange: (String) -> Unit,
    onCloseClicked: () -> Unit,
    search: () -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier
            .fillMaxWidth()
            .height(56.dp),
        elevation = 4.dp,
        color = MaterialTheme.colors.surface
    )
    {
        TextField(modifier = modifier
            .fillMaxWidth(),
            value = text,

            onValueChange = {
                onTextChange(it)
                search()
            },
            placeholder = {
                Text(
                    text = stringResource(R.string.search_here),
                    style = MaterialTheme.typography.body1
                )
            },
            singleLine = true,
            leadingIcon = {
                IconButton(
                    modifier = modifier,
                    onClick = {}
                ) {
                    Icon(
                        imageVector = Icons.Filled.Search,
                        contentDescription = stringResource(R.string.search_icon_description),
                    )
                }
            },
            trailingIcon = {
                IconButton(
                    onClick = {
                        onTextChange("")
                        onCloseClicked()
                    }
                ) {
                    Icon(
                        imageVector = Icons.Filled.Close,
                        contentDescription = stringResource(R.string.close_icon_description),
                    )
                }
            },
            keyboardOptions = KeyboardOptions(
                imeAction = ImeAction.Search
            ),
            keyboardActions = KeyboardActions(
                onSearch = {}
            ),
            colors = TextFieldDefaults.textFieldColors(
                backgroundColor = Color.Transparent,
                cursorColor = MaterialTheme.colors.onSurface
            ),
            textStyle = MaterialTheme.typography.body1
        )
    }
}

@Composable
fun TrafficNotificationCard(
    trafficNotification: TrafficNotification,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier
            .padding(8.dp), elevation = 4.dp
    ) {
        Column(
            modifier = modifier.animateContentSize(
                animationSpec = spring(
                    dampingRatio = Spring.DampingRatioMediumBouncy, stiffness = Spring.StiffnessLow
                )
            )
        ) {
            Row {
                TrafficNotificationIcon(notificationIcon = getNotificationIcon(trafficNotification.name))
                // you should place Text in a Box to be able to center it vertically
                Box(
                    modifier = modifier
                        .fillMaxHeight()
                        .align(Alignment.CenterVertically)
                        .padding(2.dp)
                ) {
                    Text(
                        text = trafficNotification.name,
                        textAlign = TextAlign.Center,
                        style = MaterialTheme.typography.h2
                        )
                }
                Spacer(Modifier.weight(1f))
                Box(
                    modifier = modifier
                        .fillMaxHeight()
                        .align(Alignment.CenterVertically)
                        .padding(2.dp)
                ) {
                    Column {
                        Text(
                            text = trafficNotification.latitude.toString(),
                            style = MaterialTheme.typography.h2
                        )
                        Text(
                            text = trafficNotification.longitude.toString(),
                            style = MaterialTheme.typography.h2
                        )
                    }
                }
                IconButton(onClick = { expanded = !expanded }) {
                    Icon(
                        imageVector = if (expanded) Icons.Filled.ExpandLess else Icons.Filled.ExpandMore,
                        tint = MaterialTheme.colors.secondary,
                        contentDescription = "",
                    )
                }
            }
            if (expanded) {
                TrafficNotificationDetails(
                    trafficNotification = trafficNotification,
                    modifier = modifier
                )
            }
        }
    }
}

@Composable
fun TrafficNotificationDetails(
    trafficNotification: TrafficNotification,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier.padding(start = 10.dp, end = 10.dp, bottom = 10.dp)) {
        Text(
            text = "id: ${trafficNotification.id}",
            style = MaterialTheme.typography.body1
        )
        Text(
            text = "type: ${trafficNotification.type}",
            style = MaterialTheme.typography.body1
        )
        Text(
            text = "source: ${trafficNotification.source}",
            style = MaterialTheme.typography.body1
        )
        Text(
            text = "transport: ${trafficNotification.transport}",
            style = MaterialTheme.typography.body1
        )
        Text(
            text = "message: ${trafficNotification.message}",
            style = MaterialTheme.typography.body1
        )
        Text(
            text = "date: ${trafficNotification.date}",
            style = MaterialTheme.typography.body1
        )
    }
}

fun getNotificationIcon(notificationName: String): Int {
    if (notificationName == "Waze Alerts") {
        return R.drawable.waze
    } else if (notificationName == "Coyote Alerts") {
        return R.drawable.coyote
    } else {
        return R.drawable.nmbs
    }
}

@Composable
fun TrafficNotificationIcon(@DrawableRes notificationIcon: Int, modifier: Modifier = Modifier) {
    Image(
        modifier = modifier
            .size(64.dp)
            .padding(8.dp),
        contentScale = ContentScale.FillWidth,
        painter = painterResource(notificationIcon),
        contentDescription = null
    )
}

@Preview
@Composable
fun TrafficNotificationCardPreview() {
    TrafficNotificationCard(
        TrafficNotification(
            "id0",
            "iRail Delays",
            "",
            "",
            "",
            "",
            0.0,
            0.0,
            ""
        )
    )
}
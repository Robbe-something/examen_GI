package com.example.trafficfeed.ui

import android.annotation.SuppressLint
import androidx.annotation.DrawableRes
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.layout.R
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.trafficfeed.model.TrafficNotification

@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun TrafficNotificationList(
    modifier: Modifier = Modifier,
    trafficViewModel: TrafficViewModel,
    onClickNext: () -> Unit
) {
    val trafficUiState by trafficViewModel.uiState.collectAsState()

    Scaffold(
        topBar = {
            TopBar(
                modifier = modifier,
                searchText = trafficUiState.searchText,
                onTextChange = {
                    trafficViewModel.updateSearchText(it)
                },
                search = {
                    trafficViewModel.updateTrafficNotificationsToShow()
                },
                onCloseClicked = {
                    trafficViewModel.updateSearchText("")
                }
            )
        }
    )
    {
        LazyColumn {
            items(trafficUiState.trafficNotificationsToShow) { trafficNotification ->
                TrafficNotificationCard(
                    trafficNotification = trafficNotification,
                    onClickNext = {
                        trafficViewModel.updateSelectedTrafficNotification(trafficNotification)
                        onClickNext()
                    })
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
                text = stringResource(com.example.trafficfeed.R.string.title),
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
                    contentDescription = stringResource(com.example.trafficfeed.R.string.search_icon_description),
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
                    text = stringResource(com.example.trafficfeed.R.string.search_here),
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
                        contentDescription = stringResource(com.example.trafficfeed.R.string.search_icon_description),
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
                        contentDescription = stringResource(com.example.trafficfeed.R.string.close_icon_description),
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
    onClickNext: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = Modifier
            .padding(8.dp), elevation = 4.dp
    ) {
        Column(
            modifier = modifier
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
                Box(
                    modifier = modifier
                        .fillMaxHeight()
                        .align(Alignment.CenterVertically)
                ) {
                    IconButton(onClick = onClickNext) {
                        Icon(
                            imageVector = Icons.Filled.ArrowRight,
                            tint = MaterialTheme.colors.secondary,
                            contentDescription = "",
                        )
                    }
                }
            }
        }
    }
}

fun getNotificationIcon(notificationName: String): Int {
    if (notificationName == "Waze Alerts") {
        return com.example.trafficfeed.R.drawable.waze
    } else if (notificationName == "Coyote Alerts") {
        return com.example.trafficfeed.R.drawable.coyote
    } else {
        return com.example.trafficfeed.R.drawable.nmbs
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
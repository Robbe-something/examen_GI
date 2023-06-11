package com.example.trafficfeed.ui

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowRight
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.trafficfeed.R
import com.example.trafficfeed.model.TrafficNotification

@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun TrafficNotificationDetails(
    trafficViewModel: TrafficViewModel,
    openMapButtonClicked: () -> Unit,
    upNavigate: () -> Unit,
    modifier: Modifier = Modifier
) {
    val trafficUiState by trafficViewModel.uiState.collectAsState()

    Scaffold(
        topBar = {
            DetailTopBar(upNavigate = upNavigate)
        }
    )
    {
        Column {
            Card(
                modifier = Modifier
                    .padding(8.dp), elevation = 4.dp
            ) {
                Column(
                    modifier = modifier
                ) {
                    Row {
                        TrafficNotificationIcon(
                            notificationIcon = getNotificationIcon(
                                trafficUiState.selectedTrafficNotification?.name.toString()
                            )
                        )
                        // you should place Text in a Box to be able to center it vertically
                        Box(
                            modifier = modifier
                                .align(Alignment.CenterVertically)
                                .padding(2.dp)
                        ) {
                            Text(
                                text = trafficUiState.selectedTrafficNotification?.name ?: "",
                                textAlign = TextAlign.Center,
                                style = MaterialTheme.typography.h2
                            )
                        }
                        Spacer(Modifier.weight(1f))
                        Box(
                            modifier = modifier
                                .align(Alignment.CenterVertically)
                                .padding(8.dp)
                        ) {
                            Column {
                                Text(
                                    text = trafficUiState.selectedTrafficNotification?.latitude.toString(),
                                    style = MaterialTheme.typography.h2
                                )
                                Text(
                                    text = trafficUiState.selectedTrafficNotification?.longitude.toString(),
                                    style = MaterialTheme.typography.h2
                                )
                            }
                        }
                    }
                    Column(
                        modifier = modifier
                            .padding(start = 10.dp, end = 10.dp, bottom = 10.dp)
                    )
                    {
                        Text(
                            text = "id: ${trafficUiState.selectedTrafficNotification?.id}",
                            style = MaterialTheme.typography.body1
                        )
                        Text(
                            text = "type: ${trafficUiState.selectedTrafficNotification?.type}",
                            style = MaterialTheme.typography.body1
                        )
                        Text(
                            text = "source: ${trafficUiState.selectedTrafficNotification?.source}",
                            style = MaterialTheme.typography.body1
                        )
                        Text(
                            text = "transport: ${trafficUiState.selectedTrafficNotification?.transport}",
                            style = MaterialTheme.typography.body1
                        )
                        Text(
                            text = "message: ${trafficUiState.selectedTrafficNotification?.message}",
                            style = MaterialTheme.typography.body1
                        )
                        Text(
                            text = "date: ${trafficUiState.selectedTrafficNotification?.date}",
                            style = MaterialTheme.typography.body1
                        )
                    }
                }
            }
            Button(
                modifier = modifier
                    .padding(start = 8.dp, end = 8.dp, top = 0.dp)
                    .fillMaxWidth(),
                onClick = openMapButtonClicked
            )
            {
                Text(
                    text = "view on map"
                )
            }
        }
    }
}

@Composable
fun DetailTopBar(
    upNavigate: () -> Unit,
    modifier: Modifier = Modifier
) {
    TopAppBar(
        elevation = 4.dp,
        title = {
            Text(
                text = stringResource(R.string.title),
                style = MaterialTheme.typography.h1
            )
        },
        navigationIcon = {
            IconButton(onClick = upNavigate) {
                Icon(
                    imageVector = Icons.Filled.ArrowBack,
                    contentDescription = stringResource(R.string.back)
                )
            }
        },
        backgroundColor = MaterialTheme.colors.surface,
    )
}
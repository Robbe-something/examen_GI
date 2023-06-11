package com.example.trafficfeed

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.ContextCompat.startActivity
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.trafficfeed.data.DataSource
import com.example.trafficfeed.model.TrafficNotification
import com.example.trafficfeed.ui.TrafficNotificationDetails
import com.example.trafficfeed.ui.TrafficNotificationList
import com.example.trafficfeed.ui.TrafficViewModel

enum class TrafficFeedScreen {
    Overview,
    Detail
}

@Composable
fun TrafficFeed(
    trafficViewModel: TrafficViewModel = viewModel(),
    modifier: Modifier = Modifier
) {
    val navController = rememberNavController()
    val context = LocalContext.current
    val trafficUiState by trafficViewModel.uiState.collectAsState()

    NavHost(
        navController = navController,
        startDestination = TrafficFeedScreen.Overview.name,
        modifier = modifier
    ) {
        composable(route = TrafficFeedScreen.Overview.name) {
            TrafficNotificationList(
                trafficViewModel = trafficViewModel,
                onClickNext = {
                    navController.navigate(TrafficFeedScreen.Detail.name)
                }
            )
        }
        composable(route = TrafficFeedScreen.Detail.name) {
            TrafficNotificationDetails(
                openMapButtonClicked = {
                    openMap(context, trafficUiState.selectedTrafficNotification)
                },
                trafficViewModel = trafficViewModel,
                upNavigate = {
                    navController.navigateUp()
                }
            )
        }
    }
}

private fun openMap(context: Context, trafficNotification: TrafficNotification?) {
    if(trafficNotification != null) {
        val gmmIntentUri =
            Uri.parse("geo:${trafficNotification.latitude},${trafficNotification.longitude}?q=${trafficNotification.latitude},${trafficNotification.longitude}")
        val intent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
        intent.setPackage("com.google.android.apps.maps")
        context.startActivity(intent)
    }
}
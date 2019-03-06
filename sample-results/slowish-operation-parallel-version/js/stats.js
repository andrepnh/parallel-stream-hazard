var stats = {
    type: "GROUP",
name: "Global Information",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "Global Information",
    "numberOfRequests": {
        "total": "990",
        "ok": "990",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "72",
        "ok": "72",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "19452",
        "ok": "19452",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "2668",
        "ok": "2668",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "4279",
        "ok": "4279",
        "ko": "-"
    },
    "percentiles1": {
        "total": "453",
        "ok": "453",
        "ko": "-"
    },
    "percentiles2": {
        "total": "3757",
        "ok": "3757",
        "ko": "-"
    },
    "percentiles3": {
        "total": "9587",
        "ok": "9587",
        "ko": "-"
    },
    "percentiles4": {
        "total": "18988",
        "ok": "18988",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 572,
        "percentage": 58
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 56,
        "percentage": 6
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 362,
        "percentage": 37
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "13.75",
        "ok": "13.75",
        "ko": "-"
    }
},
contents: {
"req_slowish-operati-003d7": {
        type: "REQUEST",
        name: "Slowish operation (parallel)",
path: "Slowish operation (parallel)",
pathFormatted: "req_slowish-operati-003d7",
stats: {
    "name": "Slowish operation (parallel)",
    "numberOfRequests": {
        "total": "990",
        "ok": "990",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "72",
        "ok": "72",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "19452",
        "ok": "19452",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "2668",
        "ok": "2668",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "4279",
        "ok": "4279",
        "ko": "-"
    },
    "percentiles1": {
        "total": "453",
        "ok": "453",
        "ko": "-"
    },
    "percentiles2": {
        "total": "3757",
        "ok": "3757",
        "ko": "-"
    },
    "percentiles3": {
        "total": "9587",
        "ok": "9587",
        "ko": "-"
    },
    "percentiles4": {
        "total": "18988",
        "ok": "18988",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 572,
        "percentage": 58
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 56,
        "percentage": 6
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 362,
        "percentage": 37
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "13.75",
        "ok": "13.75",
        "ko": "-"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}

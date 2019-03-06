var stats = {
    type: "GROUP",
name: "Global Information",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "Global Information",
    "numberOfRequests": {
        "total": "1980",
        "ok": "1980",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "26",
        "ok": "26",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "36903",
        "ok": "36903",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "2350",
        "ok": "2350",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "5505",
        "ok": "5505",
        "ko": "-"
    },
    "percentiles1": {
        "total": "280",
        "ok": "280",
        "ko": "-"
    },
    "percentiles2": {
        "total": "2053",
        "ok": "2053",
        "ko": "-"
    },
    "percentiles3": {
        "total": "15856",
        "ok": "15856",
        "ko": "-"
    },
    "percentiles4": {
        "total": "28555",
        "ok": "28555",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 1288,
        "percentage": 65
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 75,
        "percentage": 4
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 617,
        "percentage": 31
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "26.4",
        "ok": "26.4",
        "ko": "-"
    }
},
contents: {
"req_somewhat-quick--6149c": {
        type: "REQUEST",
        name: "Somewhat quick operation (parallel)",
path: "Somewhat quick operation (parallel)",
pathFormatted: "req_somewhat-quick--6149c",
stats: {
    "name": "Somewhat quick operation (parallel)",
    "numberOfRequests": {
        "total": "990",
        "ok": "990",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "26",
        "ok": "26",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "36903",
        "ok": "36903",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "1554",
        "ok": "1554",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "4730",
        "ok": "4730",
        "ko": "-"
    },
    "percentiles1": {
        "total": "78",
        "ok": "78",
        "ko": "-"
    },
    "percentiles2": {
        "total": "494",
        "ok": "494",
        "ko": "-"
    },
    "percentiles3": {
        "total": "6937",
        "ok": "6937",
        "ko": "-"
    },
    "percentiles4": {
        "total": "26990",
        "ok": "26990",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 769,
        "percentage": 78
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 32,
        "percentage": 3
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 189,
        "percentage": 19
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "13.2",
        "ok": "13.2",
        "ko": "-"
    }
}
    },"req_slowish-operati-003d7": {
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
        "total": "76",
        "ok": "76",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "35825",
        "ok": "35825",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "3146",
        "ok": "3146",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "6081",
        "ok": "6081",
        "ko": "-"
    },
    "percentiles1": {
        "total": "594",
        "ok": "594",
        "ko": "-"
    },
    "percentiles2": {
        "total": "3409",
        "ok": "3409",
        "ko": "-"
    },
    "percentiles3": {
        "total": "19819",
        "ok": "19819",
        "ko": "-"
    },
    "percentiles4": {
        "total": "29574",
        "ok": "29574",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 519,
        "percentage": 52
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 43,
        "percentage": 4
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 428,
        "percentage": 43
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "13.2",
        "ok": "13.2",
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

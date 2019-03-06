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
        "total": "65",
        "ok": "65",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "505",
        "ok": "505",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "195",
        "ok": "195",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "118",
        "ok": "118",
        "ko": "-"
    },
    "percentiles1": {
        "total": "308",
        "ok": "308",
        "ko": "-"
    },
    "percentiles2": {
        "total": "312",
        "ok": "312",
        "ko": "-"
    },
    "percentiles3": {
        "total": "313",
        "ok": "313",
        "ko": "-"
    },
    "percentiles4": {
        "total": "314",
        "ok": "314",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 1980,
        "percentage": 100
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 0,
        "percentage": 0
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 0,
        "percentage": 0
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "32.459",
        "ok": "32.459",
        "ko": "-"
    }
},
contents: {
"req_somewhat-quick--4f1d5": {
        type: "REQUEST",
        name: "Somewhat quick operation (sequential)",
path: "Somewhat quick operation (sequential)",
pathFormatted: "req_somewhat-quick--4f1d5",
stats: {
    "name": "Somewhat quick operation (sequential)",
    "numberOfRequests": {
        "total": "990",
        "ok": "990",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "65",
        "ok": "65",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "505",
        "ok": "505",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "78",
        "ok": "78",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "14",
        "ok": "14",
        "ko": "-"
    },
    "percentiles1": {
        "total": "78",
        "ok": "78",
        "ko": "-"
    },
    "percentiles2": {
        "total": "78",
        "ok": "78",
        "ko": "-"
    },
    "percentiles3": {
        "total": "79",
        "ok": "79",
        "ko": "-"
    },
    "percentiles4": {
        "total": "80",
        "ok": "80",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 990,
        "percentage": 100
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 0,
        "percentage": 0
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 0,
        "percentage": 0
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "16.23",
        "ok": "16.23",
        "ko": "-"
    }
}
    },"req_slowish-operati-48ad4": {
        type: "REQUEST",
        name: "Slowish operation (sequential)",
path: "Slowish operation (sequential)",
pathFormatted: "req_slowish-operati-48ad4",
stats: {
    "name": "Slowish operation (sequential)",
    "numberOfRequests": {
        "total": "990",
        "ok": "990",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "308",
        "ok": "308",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "328",
        "ok": "328",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "312",
        "ok": "312",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "1",
        "ok": "1",
        "ko": "-"
    },
    "percentiles1": {
        "total": "312",
        "ok": "312",
        "ko": "-"
    },
    "percentiles2": {
        "total": "312",
        "ok": "312",
        "ko": "-"
    },
    "percentiles3": {
        "total": "313",
        "ok": "313",
        "ko": "-"
    },
    "percentiles4": {
        "total": "314",
        "ok": "314",
        "ko": "-"
    },
    "group1": {
        "name": "t < 800 ms",
        "count": 990,
        "percentage": 100
    },
    "group2": {
        "name": "800 ms < t < 1200 ms",
        "count": 0,
        "percentage": 0
    },
    "group3": {
        "name": "t > 1200 ms",
        "count": 0,
        "percentage": 0
    },
    "group4": {
        "name": "failed",
        "count": 0,
        "percentage": 0
    },
    "meanNumberOfRequestsPerSecond": {
        "total": "16.23",
        "ok": "16.23",
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

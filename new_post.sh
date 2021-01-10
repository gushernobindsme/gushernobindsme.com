#!/bin/bash
unixtime=`date +%s`
today=`date '+%Y-%m-%d 09:00 +0900'`

mkdir src/content/$unixtime
cat - << EOS > src/content/$unixtime/index.md
---
title: "$today"
date: $today
---
EOS
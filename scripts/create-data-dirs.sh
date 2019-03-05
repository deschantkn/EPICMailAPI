#!/bin/bash
set -ev

if [ ! -d "./server/data" ]; then
  mkdir ./server/data
  mkdir ./server/data/users
  mkdir ./server/data/tokens
  exit 1
fi
exit 1
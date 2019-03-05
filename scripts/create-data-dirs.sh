#!/bin/bash
set -ev

if [ ! -d "./server/data" ]; then
  mkdir ./server/data
  mkdir ./server/data/users
  mkdir ./server/data/tokens
fi
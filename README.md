# Token Queue - Backend API.

Visitor Queue Management with Tokens.

## Specification

Download the [Token-System-Spec.pdf](https://s3.amazonaws.com/cdn.vidura/token/Token-System-Spec.pdf)

If there is any trouble downloading the spec. try again or please do not hesitate to 
contact me for help.

## Setup

Checkout to `release/prototype_v1 branch` in both frontend and backend.

1. This is the NodeJS backend required to run this app.
2. Find the ReactJS frontend application here:.\
https://github.com/ViduraAdikari/token-queue.git

Run `npm install` for both apps

## When Backend Starts
As the backend starts, following data will be loaded to the global variables.

##### 3 Services.
1. Billing / Payments.
2. Document Services.
3. Consultation

##### 7 Counters.
- 2 x Counters - Billing / Payments (Counter 1 & 2).
- 4 x Counters - Document Services (Counter 3, 4, 5, & 6).
- 1 x Counter - Consultation (Counter 7 only). 

## Functions
Please check README.md of ReactJS frontend app for functions and instructions.

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:4300/test](http://localhost:4300/test) in the browser to check whether the server is running.
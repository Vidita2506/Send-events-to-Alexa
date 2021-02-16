# cmpe295-proactive-events-api

This code provides REST APIs to invoke Alexa Proactive Events APIs. 2 APIs are provided:
1) /auth: Returns the authentication token which is valid for 3600 seconds
2) /postevent: Sends a Proactive event to Alexa devices with the linked account.

Requests:

1) /auth : Method POST

Returns a token

2) /postevent: Method Post

Request Body: JSON Object. For e.g:

{
    "token": "Atc|MQEBIPc2ucMSZYqVDeHWhgr1ZZraaFIVTo5IaF3ZJNQrvO3E5VZZoFJEUkTc3aczbxLT5VtPRgU-jV8Ly8GkHYmzl2iAwD_QYwZP3xgjMgxjxkjNWlFLSkC-Gu71JHXTzqN0VnY_2tYaQ1brxfiVTnPxsDGpucoB_rF4fi9LSAzGUseaDWykkTdgFm_DL0YgxAMioBVXNzVhtZ4Z2bcgR0ey34wE44t2azR2sUJbfDUnOW3C5X23WI4R3Yj2PAdPw75kr3w",

    "visitor": "John"
}

Replace Token by the one received in step 1. Replace visitor by the name of the person at the door. 

Response: Accepted / Error


const express = require("express");
const router = require("./login.route");

router.post("/logout", async (req, res) => {
    console.log("logout api 탐 !!")
});
module.exports = router;
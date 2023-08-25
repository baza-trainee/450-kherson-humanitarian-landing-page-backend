module.exports = {
  token: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 30,
    expiresTime () { 
      return this.days * 24 * 60 * 60 + this.hours * 60 * 60 + this.minutes * 60 + this.seconds;
    }
  }
} 
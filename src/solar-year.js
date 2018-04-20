class User {
  constructor() {
    this.birthDate;
    this.currentDate;
    this.earthAgeSeconds;
    this.earthAgeYears;
    this.marsAgeYears;
    this.mercuryAgeYears;
    this.venusAgeYears;
  }

  calcEarthAge() {
    this.earthAgeSeconds = (this.currentDate - this.birthDate) / 1000;
    this.earthAgeYears = this.earthAgeSeconds / 31536000;
  }

  calcSolarYearAge() {
    this.marsAgeYears = parseFloat((this.earthAgeYears / 1.88).toFixed(4));
    this.mercuryAgeYears = parseFloat((this.earthAgeYears / 0.24).toFixed(4));
    this.venusAgeYears = parseFloat((this.earthAgeYears / 0.62).toFixed(4));
  }
}

export { User };

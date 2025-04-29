import type {
  FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
} from '@playwright/test/reporter';

type TestAnalytic = {
  count: {
      passed: number;
      failed: number;
  }

  passedCases: string[];
  failedCases: string[];

  runningTimes: Record<string, number>;
  totalRunTime: number;
}

class TelegramReporter implements Reporter {
  testResults = {};
  testAnalytic: TestAnalytic;
  startTime: Date;

  async onBegin(config: FullConfig, suite: Suite) {
      // const msg = `Starting the run with ${suite.allTests().length} tests`;
      // const res = await fetch(`https://api.telegram.org/bot7715921998:AAGRB-M-Hl0l-aPjkBLa4fYo0DdlpDTq4ZQ/sendMessage?chat_id=-1002513637187&text=${msg}`);
      this.startTime = new Date();
      this.testAnalytic = {
          count: {
              passed: 0,
              failed: 0
          },
          passedCases: [],
          failedCases: [],

          runningTimes: {},
          totalRunTime: 0
      }

  }

  onTestBegin(test: TestCase, result: TestResult) {
      // console.log(`Starting test ${test.title}`);
      const now = new Date();
      this.testAnalytic.runningTimes[test.title] = now.getTime();
  }

  onTestEnd(test: TestCase, result: TestResult) {
      // if (!this.testResults[result.status]) {
      //     this.testResults[result.status] = 1;
      // } else {
      //     this.testResults[result.status]++;
      // }

      const now = new Date();
      const runningTime = now.getTime() - this.testAnalytic.runningTimes[test.title];
      this.testAnalytic.runningTimes[test.title] = runningTime;

      const testResult = result.status;
      if (testResult === "passed") {
          this.testAnalytic.count.passed++;
          this.testAnalytic.passedCases.push(test.title);
      } else if (testResult === "failed") {
          this.testAnalytic.count.failed++;
          this.testAnalytic.failedCases.push(test.title);
      }
  }

  async onEnd(result: FullResult) {
      const now = new Date();
      this.testAnalytic.totalRunTime = now.getTime() - this.startTime.getTime();

      console.log(this.testAnalytic);
      for (const [key, value] of Object.entries(this.testAnalytic.runningTimes)) {
          const msg = `- Test name: ${key}, running time: ${value} ms`;

      }

      const msg = this.formatMessage();

      const payload = {
          chat_id: -1002630313735,
          text: msg,
          parse_mode: 'MarkdownV2', // Enable MarkdownV2 formatting
      };

      console.log(msg);

      const res = await fetch(`https://api.telegram.org/bot8008298874:AAGECgLSwZX64WLNuMXrdL__ESIhqJ0C7ZM/sendMessage`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
      });

      const resData = await res.json();
      console.log(resData);
  }

  formatMessage() {
      const { count, passedCases, failedCases, runningTimes, totalRunTime } = this.testAnalytic;

      let message = `*🔔 Test Run Summary* 🚀\n\n`;
      message += `*📊 Total Tests*: ${count.passed + count.failed}\n`;
      message += `*✅ Passed*: ${count.passed}\n`;
      message += `*❌ Failed*: ${count.failed}\n`;
      message += `*⏱️ Total Time*: ${this.escapeTime(totalRunTime)}\n\n`;

      // Passed cases
      message += `*✅ Passed Cases*:\n`;
      if (passedCases.length > 0) {
          passedCases.forEach((test) => {
              message += `\\- ${this.escapeMarkdownV2(test)} \\(${this.escapeTime(runningTimes[test])}\\)\n`;
          });
      } else {
          message += `\\- None\n`;
      }
      message += '\n';

      // Failed cases
      message += `*❌ Failed Cases*:\n`;
      if (failedCases.length > 0) {
          failedCases.forEach((test) => {
              message += `\\- ${this.escapeMarkdownV2(test)} \\(${this.escapeTime(runningTimes[test])}s\\)\n`;
          });
      } else {
          message += `\\- None\n`;
      }

      return message;
  }

  escapeTime(time: number) {
      return `${this.escapeMarkdownV2("" + Math.round(time / 100) / 10)}s`
  }

  escapeMarkdownV2(text) {
      const specialChars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
      let escaped = text;
      specialChars.forEach((char) => {
          escaped = escaped.replace(new RegExp(`\\${char}`, 'g'), `\\${char}`);
      });
      return escaped;
  }
}


export default TelegramReporter;

/*
*🔔 Test Run Summary* 🚀

*📊 Total Tests*: 3
*✅ Passed*: 2
*❌ Failed*: 1
*⏱️ Total Time*: 0.5s

*✅ Passed Cases*:
- test 2 (0.005s)
- test 3 (0.006s)

*❌ Failed Cases*:
- test 1 (0.155s)
*/
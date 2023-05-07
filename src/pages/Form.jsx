import React, { Component } from 'react';
import ResumeComponent from '../components/ResumeComponent';
import JDComponent from '../components/JDComponent';
import { initial_prompt, compareResumeToJD } from '../../utilities/openai'
import ComparisonComponent from '../components/ComparisonComponent';
import MockInterviewComponent from '../components/MockInterviewComponent';
import LoginComponent from '../components/LoginComponent'

export default class Form extends Component {

  state = {
    step: 1,
    resumeString: "",
    jobDescriptionString: "",
    prompt: initial_prompt,
    res: "",
    user: null
  };

  // goes back to the previous step
  previousStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // proceeds to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  // handles field changes
  handleChange = (input) => (e) => {
    if (e.target?.files) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({ [input]: file });
        this.setState({ [`${input}PreviewUrl`]: reader.result });
      };
      reader.readAsDataURL(file);
      return;
    }
    if (Array.isArray(e) || e.hasOwnProperty('label')) {
      console.log(e);
      this.setState({ [input]: e });
    } else {
      console.log(e);
      this.setState({ [input]: e.target.value });
      console.log(e.target.value);
    }
    console.log(this.state);
  };

  setResumeString = (text) => {
    this.setState({ resumeString: text });
  }

  setJobDescriptionString = (text) => {
    this.setState({ jobDescriptionString: text });
  }

  setPrompt = (newPrompt) => {
    this.setState({ prompt: newPrompt });
  }

  setRes = (resu) => {
    this.setState({ res: resu });
  }

  setUser = (user) => {
    this.setState({user: user})
  }

  render() {
    const { step } = this.state;
    const {
      resumeString,
      jobDescriptionString,
      prompt,
      res
    } = this.state;
    const values = {
      resumeString,
      jobDescriptionString,
      prompt,
      res
    };
    console.log(this.state)

    switch (step) {
      case 1:
        return (
          <LoginComponent
          nextStep = {this.nextStep}
          setUser = {this.setUser}
          />
        )
      case 2:
        return (
          <JDComponent
            previousStep={this.previousStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            setJobDescriptionString={this.setJobDescriptionString}
            setRes = {this.setRes}
            setPrompt = {this.setPrompt}
            values={values}
          />
        );
      case 3:
        return (
          <MockInterviewComponent
            previousConvo={values.prompt}
            firstMessage = {values.res}
          />
        );
      default:
      // do nothing
    }
  }
}
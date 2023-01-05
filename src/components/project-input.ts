/// <reference path="component.ts" />

namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, 'user-input');

      this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

      this.configure();
      this.renderContent();
    }

    renderContent() {}

    configure() {
      this.element.addEventListener('submit', this.submitHandler);
    }

    private gatherUserInfo(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const validatableTitle: Validatable = {
        value: enteredTitle,
        required: true
      }
      const validatableDescription: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5
      }

      const validatablePeople: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5
      }

      if (
        !validate(validatableTitle) ||
        !validate(validatableDescription) ||
        !validate(validatablePeople)
      ) {
        alert("Invalid input, please try again.");
        return
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople]
      }
    }

    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }
    @autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInfo();

      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }
  }
}
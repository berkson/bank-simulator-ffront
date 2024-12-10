import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ApiError } from '../models/error/api-error.model';
import { ErrorMessages, Messages } from '../messages';
import { ValidationError } from '../models';
import { MessageType } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private errorConfig: MatSnackBarConfig = {
    duration: 5000,
    panelClass: ['style-error'],
    verticalPosition: 'top',
  };

  private successConfig: MatSnackBarConfig = {
    duration: 5000,
    panelClass: ['style-success'],
    verticalPosition: 'top',
  };

  constructor(private snack: MatSnackBar) {}

  showSnackErrors(errors: ApiError[]): void {
    if (errors.length > 1) {
      let messages = errors.map((e) => e.message);
      this.multiError(messages);
    } else {
      this.oneError(errors[0]);
    }
  }

  private multiError(
    errors: string[],
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ): void {
    let message = '';

    for (let i = 0; i < errors.length; i++) {
      if (i == errors.length - 1) {
        message += errors[i];
        break;
      }
      message += errors[i] + '\n';
    }

    this.snack.open(message, ErrorMessages.error, {
      duration: 5000,
      panelClass: ['style-error'],
      verticalPosition: verticalPosition,
    });
  }

  private oneError(error: ApiError | string): void {
    if (typeof error === 'string') {
      this.snack.open(error, ErrorMessages.error, {
        duration: 5000,
        panelClass: ['style-error'],
        verticalPosition: 'bottom',
      });
    } else {
      this.snack.open(error.message, ErrorMessages.error, this.errorConfig);
    }
  }

  showSnackErrorsDetails(errors: ValidationError[]): void {
    let messages: string[] = [];

    errors.forEach((e) => {
      if (!e.details) {
        messages.push(e.message);
      } else {
        messages.push(e.message + ': ');

        e.details.forEach((m) => {
          let text: string[] = m.split(':');

          if (text.length > 2) {
            messages.push(`${text[1].trim()}: ${text[2].trim()}`);
          } else {
            messages.push(text[1].trim());
          }
        });
      }
    });

    this.multiError(messages);
  }

  /**
   *
   * @param message mensagem a ser enviada/mostrada
   * @param type tipo de mensagem. Não obrigatória.
   * @param buttonMessage Mensagem do botão. Se o tipo não for informado o valor padrão é Info
   */
  snackMessage(
    message: string,
    type?: MessageType,
    buttonMessage: string = 'Info'
  ) {
    let config = {};

    if (type === MessageType.SUCCESS) {
      buttonMessage = Messages.success;
      config = this.successConfig;
    }

    if (type === MessageType.ERROR) {
      buttonMessage = ErrorMessages.error;
      config = this.errorConfig;
    }

    this.snack.open(message, buttonMessage, config);
  }

  handleValidationErrors(problems: any) {
    try {
      let errors: ValidationError[] = problems;
      this.showSnackErrorsDetails(errors);
    } catch (e) {
      this.snackMessage(
        ErrorMessages.tryAgain,
        MessageType.ERROR,
        ErrorMessages.error
      );
    }
  }

  handleApiErrors(problems: any) {
    try {
      let errors: ApiError[] = problems;
      this.showSnackErrors(errors);
    } catch (e) {
      this.snackMessage(ErrorMessages.tryAgain, MessageType.ERROR);
    }
  }
}

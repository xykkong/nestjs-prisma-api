export class UserAlreadyExistError extends Error {
  constructor(email: string) {
    super(`User with the same email (${email}) already exists!`);
  }
}

export class UserPassowordNotMatchError extends Error {
  constructor() {
    super(`User with password does not match`);
  }
}

export class UserNotFoundError extends Error {
  constructor(username: string) {
    super(`User not found: ${username}`);
  }
}

export function validateformData(formData) {
  const errors = [];

  // trim title first
  const title = formData.title ? formData.title.trim() : '';

  // valid status list
  const validStatuses = ['playing', 'want', 'completed'];

  // valid genre list
  const validGenres = [
    'action',
    'rpg',
    'adventure',
    'sports',
    'strategy',
    'sandbox',
    'survival',
    'shooter',
    'fighting',
    'racing',
    'simulation',
    'open',
    'puzzle'
  ];

  // make genres an array
  let genres = formData.genres || [];
  if (!Array.isArray(genres)) {
    genres = [genres];
  }

  // title validation
  if (!title) {
    errors.push('Game title is required.');
  }

  // status validation
  if (!validStatuses.includes(formData.status)) {
    errors.push('Please select a valid status.');
  }

  // rating validation
  if (!formData.rating && formData.status !== 'want') {
    errors.push('Please select a rating.');
  } else {
    const ratingNumber = Number(formData.rating);

    if (isNaN(ratingNumber) && formData.status !== 'want'|| ratingNumber < 1 || ratingNumber > 10) {
      errors.push('Rating must be between 1 and 10.');
    }
  }

  // genres validation
  if (genres.length === 0) {
    errors.push('Please select at least one genre.');
  } else {
    const invalidGenreFound = genres.some((genre) => !validGenres.includes(genre));
    if (invalidGenreFound) {
      errors.push('Please select only valid genres.');
    }
  }

  // notes length validation
  if (formData.notes && formData.notes.length > 400) {
    errors.push('Notes cannot be more than 400 characters.');
  }

  // additional validation for want status and wishlist button
  if (formData.status === 'want' && formData.rating) {
    errors.push('Cannot have a rating for a game you want to play.');
  }
  if(formData.status === 'want' && formData.notes) {
    errors.push('Cannot have notes for a game you want to play.');
  }

  return errors;

}

export function registerFormValidation(formData) {
  const errors = [];

  // validate first name
  if (!formData.firstName) {
    errors.push('First name is required.');
  }

  // validate last name
  if (!formData.lastName) {
    errors.push('Last name is required.');
  }

  // validate username
  if (!formData.username) {
    errors.push('Username is required.');
  }

  // validate email
  if (!formData.email) {
    errors.push('Email is required.');
  } else {
    let n = formData.email.indexOf('@');
    let d = formData.email.lastIndexOf('.');
    if (n < 1 || d < n + 2 || d + 2 >= formData.email.length) {
      errors.push('Please enter a valid email address.');
    }
  }

  // validate password
  if (!formData.password) {
    errors.push('Password is required.');
  } else if (formData.password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }

  return errors;
}

export function validateGameForm(gameForm) {
  const errors = [];

  // trim title first
  const title = gameForm.title ? gameForm.title.trim() : '';

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
  let genres = gameForm.genres || [];
  if (!Array.isArray(genres)) {
    genres = [genres];
  }

  // title validation
  if (!title) {
    errors.push('Game title is required.');
  }

  // status validation
  if (!validStatuses.includes(gameForm.status)) {
    errors.push('Please select a valid status.');
  }

  // rating validation
  if (!gameForm.rating && gameForm.status !== 'want') {
    errors.push('Please select a rating.');
  } else {
    const ratingNumber = Number(gameForm.rating);

    if (isNaN(ratingNumber) && gameForm.status !== 'want'|| ratingNumber < 1 || ratingNumber > 10) {
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
  if (gameForm.notes && gameForm.notes.length > 400) {
    errors.push('Notes cannot be more than 400 characters.');
  }

  // additional validation for want status and wishlist button
  if (gameForm.status === 'want' && gameForm.rating) {
    errors.push('Cannot have a rating for a game you want to play.');
  }
  if(gameForm.status === 'want' && gameForm.notes) {
    errors.push('Cannot have notes for a game you want to play.');
  }
  return errors;


}
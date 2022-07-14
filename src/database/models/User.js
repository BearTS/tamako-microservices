/**
 * User Schema
 * @param {Object} options 
 * @param {String} options.id
 * @param {String} options.token
 * @param {Number} options.creation_time
 * @param {Boolean} options.unlimited
 * @param {Number} options.ratelimit_reached
 * @returns {UserModel} 
 * ```js
    { 
        ownerId: String,
        token: String,
        creation_time: Number,
        unlimited: Boolean,
        ratelimit_reached: Number
    }
    ```
 */
module.exports = ({ ownerId, token, creation_time, unlimited = false, ratelimit_reached = 0 }) => {
    // Validate options
    if (typeof ownerId !== 'string')
        throw new TypeError('id param should be a valid string');
    if (typeof token !== 'string')
        throw new TypeError('token param should be a valid string');
    if (typeof creation_time !== 'number')
        throw new TypeError('creation_time param should be a valid number');
    if (typeof unlimited !== 'boolean')
        throw new TypeError('unlimited param should be a valid boolean');
    if (typeof ratelimit_reached !== 'number')
        throw new TypeError('Id ratelimit_reached should be a valid number');

    // Do the schema logic
    const UserModel = {
        ownerId: ownerId,
        token: token,
        creation_time,
        unlimited,
        ratelimit_reached: 0
    };
    return UserModel;
};
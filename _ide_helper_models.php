<?php
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App{
/**
 * App\Dislike
 *
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:46 PM
 * @class Likes
 * @property string $user_id
 * @property string $programme_id
 * @method static \Illuminate\Database\Query\Builder|\App\Dislike whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Dislike whereProgrammeId($value)
 * @mixin \Eloquent
 */
	class Dislike extends \Eloquent {}
}

namespace App{
/**
 * App\Programme
 *
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:46 PM
 * @class Programme
 * @mixin \Eloquent
 */
	class History extends \Eloquent {}
}

namespace App{
/**
 * App\Like
 *
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:46 PM
 * @class Likes
 * @property string $user_id
 * @property string $programme_id
 * @method static \Illuminate\Database\Query\Builder|\App\Like whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Like whereProgrammeId($value)
 * @mixin \Eloquent
 */
	class Like extends \Eloquent {}
}

namespace App{
/**
 * App\Programme
 *
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:46 PM
 * @class Programme
 * @property string $programme_id
 * @property string $imdb_id
 * @property string $type
 * @property boolean $series
 * @property string $genres
 * @property string $actors
 * @property string $poster
 * @property string $rated
 * @property string $rating
 * @property string $writers
 * @property string $director
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static Builder|\App\Programme whereProgrammeId($value)
 * @method static Builder|\App\Programme whereImdbId($value)
 * @method static Builder|\App\Programme whereType($value)
 * @method static Builder|\App\Programme whereSeries($value)
 * @method static Builder|\App\Programme whereGenres($value)
 * @method static Builder|\App\Programme whereActors($value)
 * @method static Builder|\App\Programme wherePoster($value)
 * @method static Builder|\App\Programme whereRated($value)
 * @method static Builder|\App\Programme whereRating($value)
 * @method static Builder|\App\Programme whereWriters($value)
 * @method static Builder|\App\Programme whereDirector($value)
 * @method static Builder|\App\Programme whereCreatedAt($value)
 * @method static Builder|\App\Programme whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string $image
 * @property string $programme_name
 * @property-read mixed $likes
 * @property-read mixed $dislikes
 * @method static \Illuminate\Database\Query\Builder|\App\Programme whereImage($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Programme whereProgrammeName($value)
 */
	class Programme extends \Eloquent {}
}

namespace App{
/**
 * App\Dislike
 *
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:46 PM
 * @class Likes
 * @property string $user_id
 * @property string $programme_id
 * @mixin Eloquent
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Recommendation whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Recommendation whereProgrammeId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Recommendation whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Recommendation whereUpdatedAt($value)
 */
	class Recommendation extends \Eloquent {}
}

namespace App{
/**
 * App\User
 *
 * @mixin \Eloquent
 */
	class User extends \Eloquent {}
}


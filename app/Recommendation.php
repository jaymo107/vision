<?php
namespace App;

use Illuminate\Database\Eloquent;
use Illuminate\Database\Eloquent\Model;

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
class Recommendation extends Model
{
    protected $table = 'recommendations';

    protected $fillable = ['user_id', 'programme_id'];

    /**
     * @return mixed
     */
    public function getProgramme()
    {
        return Programme::whereProgrammeId($this->programme_id)->get();
    }

}
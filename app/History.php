<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

/**
 * App\Programme
 *
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:46 PM
 * @class Programme
 * @mixin \Eloquent
 */
class History extends Model
{
    protected $table = "history";
    public $incrementing = false;
    protected $fillable = ['user_id', 'programme_id'];

    public function programme()
    {
        return $this->hasOne('App\Programme', 'programme_id', 'programme_id');
    }
}
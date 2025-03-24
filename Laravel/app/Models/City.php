<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'region',
        'country',
        'latitude',
        'longitude',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
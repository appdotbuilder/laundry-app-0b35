<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\LaundryService
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property float|null $price_per_kg
 * @property float|null $price_per_piece
 * @property string $pricing_type
 * @property int $turnaround_hours
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\LaundryOrder> $orders
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService query()
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService wherePricePerKg($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService wherePricePerPiece($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService wherePricingType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService whereTurnaroundHours($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryService active()
 * @method static \Database\Factories\LaundryServiceFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class LaundryService extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price_per_kg',
        'price_per_piece',
        'pricing_type',
        'turnaround_hours',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price_per_kg' => 'decimal:2',
        'price_per_piece' => 'decimal:2',
        'turnaround_hours' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Get the orders for this service.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders(): HasMany
    {
        return $this->hasMany(LaundryOrder::class);
    }

    /**
     * Scope a query to only include active services.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the price based on pricing type.
     *
     * @return float
     */
    public function getPrice(): float
    {
        return $this->pricing_type === 'per_kg' ? $this->price_per_kg : $this->price_per_piece;
    }

    /**
     * Get the pricing unit label.
     *
     * @return string
     */
    public function getPricingUnit(): string
    {
        return $this->pricing_type === 'per_kg' ? 'kg' : 'piece';
    }
}
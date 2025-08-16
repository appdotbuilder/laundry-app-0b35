<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\LaundryOrder
 *
 * @property int $id
 * @property string $order_number
 * @property int $user_id
 * @property int $laundry_service_id
 * @property float $quantity
 * @property string|null $special_instructions
 * @property \Illuminate\Support\Carbon $pickup_date
 * @property \Illuminate\Support\Carbon $delivery_date
 * @property string $pickup_address
 * @property string $delivery_address
 * @property float $total_amount
 * @property string $status
 * @property int|null $assigned_staff_id
 * @property string|null $staff_notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\User $user
 * @property-read \App\Models\LaundryService $laundryService
 * @property-read \App\Models\User|null $assignedStaff
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder query()
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereAssignedStaffId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereDeliveryAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereDeliveryDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereLaundryServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereOrderNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder wherePickupAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder wherePickupDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereSpecialInstructions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereStaffNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder pending()
 * @method static \Illuminate\Database\Eloquent\Builder|LaundryOrder active()
 * @method static \Database\Factories\LaundryOrderFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class LaundryOrder extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'order_number',
        'user_id',
        'laundry_service_id',
        'quantity',
        'special_instructions',
        'pickup_date',
        'delivery_date',
        'pickup_address',
        'delivery_address',
        'total_amount',
        'status',
        'assigned_staff_id',
        'staff_notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'pickup_date' => 'datetime',
        'delivery_date' => 'datetime',
    ];

    /**
     * Get the customer who placed this order.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the laundry service for this order.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function laundryService(): BelongsTo
    {
        return $this->belongsTo(LaundryService::class);
    }

    /**
     * Get the staff member assigned to this order.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignedStaff(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_staff_id');
    }

    /**
     * Scope a query to only include pending orders.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include active orders (not completed or cancelled).
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->whereNotIn('status', ['completed', 'cancelled']);
    }

    /**
     * Generate a unique order number.
     *
     * @return string
     */
    public static function generateOrderNumber(): string
    {
        do {
            $randomInt = random_int(1, 9999);
            $orderNumber = 'LO' . date('Ymd') . str_pad((string) $randomInt, 4, '0', STR_PAD_LEFT);
        } while (self::where('order_number', $orderNumber)->exists());

        return $orderNumber;
    }

    /**
     * Get the status label with color coding.
     *
     * @return array
     */
    public function getStatusLabel(): array
    {
        $statusMap = [
            'pending' => ['label' => 'Pending', 'color' => 'yellow'],
            'confirmed' => ['label' => 'Confirmed', 'color' => 'blue'],
            'picked_up' => ['label' => 'Picked Up', 'color' => 'indigo'],
            'processing' => ['label' => 'Processing', 'color' => 'purple'],
            'washing' => ['label' => 'Washing', 'color' => 'blue'],
            'drying' => ['label' => 'Drying', 'color' => 'orange'],
            'ironing' => ['label' => 'Ironing', 'color' => 'pink'],
            'ready_for_delivery' => ['label' => 'Ready for Delivery', 'color' => 'cyan'],
            'out_for_delivery' => ['label' => 'Out for Delivery', 'color' => 'teal'],
            'completed' => ['label' => 'Completed', 'color' => 'green'],
            'cancelled' => ['label' => 'Cancelled', 'color' => 'red'],
        ];

        return $statusMap[$this->status] ?? ['label' => 'Unknown', 'color' => 'gray'];
    }
}
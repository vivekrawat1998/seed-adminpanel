// src/plugins/conditional-dropdown/admin/src/components/ConditionalDropdown.jsx
import React, { useState, useEffect } from 'react';
import { Select, Option } from '@strapi/design-system';
import { useCMEditViewDataManager, request } from '@strapi/helper-plugin';

const ConditionalDropdown = ({ 
  name, 
  value, 
  onChange, 
  intlLabel,
  disabled = false 
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { modifiedData } = useCMEditViewDataManager();

  // Get the parent category field value
  const categoryValue = modifiedData.category?.id || modifiedData.category;

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!categoryValue) {
        setOptions([]);
        // Clear the subcategory value when category is cleared
        onChange({
          target: {
            name,
            value: null,
          },
        });
        return;
      }

      setLoading(true);
      try {
        const { data } = await request('/categories', {
          method: 'GET',
          params: {
            'filters[parent][id][$eq]': categoryValue,
            populate: '*',
          },
        });

        const subcategoryOptions = (data.data || []).map(item => ({
          value: item.id,
          label: item.attributes.name,
        }));
        
        setOptions(subcategoryOptions);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryValue, name, onChange]);

  return (
    <Select
      name={name}
      value={value || ''}
      onChange={(selectedValue) => {
        onChange({
          target: {
            name,
            value: selectedValue || null,
          },
        });
      }}
      label={intlLabel?.defaultMessage || 'Subcategory'}
      placeholder={loading ? 'Loading...' : 'Select subcategory...'}
      disabled={disabled || !categoryValue || loading}
    >
      {options.map(option => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default ConditionalDropdown;
